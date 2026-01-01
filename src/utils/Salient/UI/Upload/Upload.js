import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

const Upload = ({ 
    supportedExtensions = [], 
    maxFileSize = 25, 
    validationErrorCallback = () => {}, 
    onFilesChange = () => {},
    uploadIconClass = null,
    fileDraggable = true,
}) => {
    
    // --- Refs for Data Persistence ---
    const fileCache = useRef({});
    const xlsxLookup = useRef({});
    const fileInputRef = useRef(null);

    // --- State ---
    const [fileData, setFileData] = useState([]);
    const [isZoneDragOver, setIsZoneDragOver] = useState(false); // Renamed for clarity
    
    // State tracks the item being dragged
    const [draggedIndex, setDraggedIndex] = useState(null);
    // State tracks the potential drop target item
    const [dragOverIndex, setDragOverIndex] = useState(null);

    const supportedFormatText = supportedExtensions.join(',');

    useEffect(() => {
        onFilesChange(fileData);
    }, [fileData, onFilesChange]);

    // --- File Processing (Adding/Removing) ---
    const handleFiles = (files) => {
        
        const newFiles = Array.from(files).map((file) => ({
            id: Date.now() + Math.random(),
            file: file,
            name: file.name,
            size: file.size,
            type: file.type
        }));

        const validFiles = [];
        newFiles.forEach(fileObj => {
            if (fileObj.size > maxFileSize * 1024 * 1024) {
                validationErrorCallback('File Size Exceeded', `"${fileObj.name}" exceeds the ${maxFileSize}MB limit.`);
                return;
            }
            const fileExtension = '.' + fileObj.name.split('.').pop().toLowerCase();
            if (supportedExtensions.length > 0 && !supportedExtensions.includes(fileExtension)) {
                validationErrorCallback('Unsupported File Type', `"${fileObj.name}" is not a supported file type.`);
                return;
            }
            const isDuplicate = fileData.some(existing => 
                existing.name === fileObj.name && existing.size === fileObj.size
            );
            if (isDuplicate) {
                validationErrorCallback('Duplicate File', `"${fileObj.name}" has already been added.`);
                return;
            }
            validFiles.push(fileObj);
            const reader = new FileReader();
            reader.onload = (e) => {
                fileCache.current[fileObj.name] = e.target.result;
                if (fileObj.name.endsWith('.xlsx') || fileObj.name.endsWith('.xls')) {
                    xlsxLookup.current[fileObj.name] = true;
                }
            };
            reader.readAsDataURL(fileObj.file);
        });

        if (validFiles.length > 0) {
            setFileData(prev => [...prev, ...validFiles]);
        }
    };

    const removeFile = (idToRemove) => {
        setFileData(prev => {
            const fileToRemove = prev.find(f => f.id === idToRemove);
            if (fileToRemove) {
                delete fileCache.current[fileToRemove.name];
                delete xlsxLookup.current[fileToRemove.name];
            }
            return prev.filter(f => f.id !== idToRemove);
        });
    };

    // --- Main Container Drag Handlers ---
    const handleZoneDrop = (e) => {
        e.preventDefault();
        setIsZoneDragOver(false);

        // Important: If dropped on a FileItem, ignore zone drop
        if (e.target.closest('.file-item')) return;

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleZoneDragOver = (e) => {
        e.preventDefault();
        setIsZoneDragOver(true);
    };

    const handleZoneDragLeave = (e) => {
        // Only clear states if leaving the main container entirely
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsZoneDragOver(false);
            setDragOverIndex(null); 
        }
    };

    // --- File Item Reordering Handlers ---

    const handleItemDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move'; 
        // Optional: set data if needed for other drop targets
        // e.dataTransfer.setData('text/plain', index); 
    };

    // Fires repeatedly when dragging over an item. Necessary to allow dropping.
    const handleItemDragOver = (e) => {
        e.preventDefault(); 
    };

    // Fires once when entering an item space. Used for visual feedback.
    const handleItemDragEnter = (index) => {
        if (draggedIndex !== null && draggedIndex !== index) {
             setDragOverIndex(index);
        }
    };

    // Fires when the dragging actually stops (mouse released)
    const handleItemDrop = (e, targetIndex) => {
        e.preventDefault();
        e.stopPropagation(); // Stop pushing up to handleZoneDrop

        if (draggedIndex === null || draggedIndex === targetIndex) return;

        // Perform the reordering now
        const newFileData = [...fileData];
        const draggedItem = newFileData[draggedIndex];
        newFileData.splice(draggedIndex, 1);
        newFileData.splice(targetIndex, 0, draggedItem);

        setFileData(newFileData);
        // Reset states in DragEnd
    };

    // Ensure cleanup happens regardless of where drop occurred
    const handleItemDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };


    const dropZoneClass = classNames('dropzone', {
        'dragover': isZoneDragOver
    });

    return (
        <div className="upload-wrapper">
            <div className="upload-container">
                <div 
                    className={dropZoneClass} 
                    onDrop={handleZoneDrop} 
                    onDragLeave={handleZoneDragLeave} 
                    onDragOver={handleZoneDragOver}
                >
                    {
                        !uploadIconClass ?
                        <div className='stack-icon'>
                            <i className="icon icon-cloud size-6x" style={{color: 'grey'}}/>
                            <i className="icon icon-top-arrow invert-icon-color" style={{bottom: '-25%'}}/>
                        </div>
                        :
                        <i className={`${uploadIconClass} upload-icon`}></i>
                    }
                    
                    <p className="upload-text">Drop your files here</p>
                    <p className={`or-text ${fileData.length > 0 ? 'hidden' : ''}`}>or</p>
                    
                    <button className="choose-btn" onClick={() => fileInputRef.current && fileInputRef.current.click()}>Choose Files</button>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        className="file-input" 
                        style={{display: 'none'}}
                        multiple 
                        onChange={(e) => handleFiles(e.target.files)} 
                        accept={supportedFormatText}
                    />
                   
                </div>
                <div className="upload-footer">
                    <div className="upload-footer-text">Supported formats: {supportedFormatText || 'All'}</div>
                    <div className="upload-footer-text">Maximum file size: {maxFileSize}MB</div>
                </div>
            </div>
           

            <div className="file-list">
                {fileData.map((file, index) => (
                    <FileItem 
                        key={file.id} 
                        file={file}
                        index={index}
                        onRemove={removeFile}
                        draggable={fileDraggable}
                        // Pass handlers
                        onDragStart={handleItemDragStart}
                        onDragOver={handleItemDragOver}
                        onDragEnter={handleItemDragEnter}
                        onDrop={handleItemDrop}
                        onDragEnd={handleItemDragEnd}
                        // Pass state booleans for styling
                        isDragging={draggedIndex === index}
                        isDragOverTarget={dragOverIndex === index}
                    />
                ))}
            </div>

            
        </div>
    );
};

const FileItem = ({
    file, 
    index,
    onRemove, 
    draggable, 
    dragIcon = 'icon icon-drag', 
    fileDeleteIcon = 'icon icon-close', 
    className,
    // Receiving new handlers
    onDragStart,
    onDragOver,
    onDragEnter,
    onDrop,
    onDragEnd,
    // Receiving new state booleans
    isDragging,
    isDragOverTarget
}) => {
    
    const fileItemClasses = classNames('file-item', {
        'dragging': isDragging && draggable,      // The item actually being moved
        'drag-over': isDragOverTarget && draggable // The item underneath the draggable item
    }, className);

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div 
            className={fileItemClasses} 
            draggable={draggable} 
            data-id={file.id}
            // Wire up the handlers, passing index where necessary
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver} 
            onDragEnter={() => onDragEnter(index)}
            onDrop={(e) => onDrop(e, index)}
            onDragEnd={onDragEnd}
        >
            {draggable && <i className={`file-icon ${dragIcon}`}></i>}
            <span className="file-name">{file.name} ({formatFileSize(file.size)})</span>
            <i 
                className={`remove-btn ${fileDeleteIcon}`} 
                onClick={(e) => {
                    e.stopPropagation(); 
                    onRemove(file.id);
                }}
            ></i>
        </div>
    );
};

export { FileItem };
export default Upload;