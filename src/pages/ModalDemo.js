import React, {useState} from 'react'

// import Salient Library
import Button from '../utils/Salient/UI/Buttons/Button';
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';
import Modal from '../utils/Salient/UI/Modal/Modal';

const ModalDemo = () => {
  const [showModal, setShowModal] = useState(false);

    return (
        <React.Fragment>
            <Card className='card-flat'>
            <CardInfo>
                <CardTitle>Modal (Click to View)</CardTitle>
            </CardInfo>
            <CardContent>
                <Button type="button" buttonStyle="blueBlur" isBlock={true} expandFull={true} inverseColor={true} onClick={(e) => {e.preventDefault(); setShowModal(true)}}>Show Modal</Button>
            </CardContent>
            </Card>
            

            <Modal title="Header" showModal={showModal} onCloseModal={(e) => {e.preventDefault(); setShowModal(false)}} className="light-theme" hasSections={true} onModalBlur={() => setShowModal(false)}>
                <section className='center-content'>
                        Section 1
                </section>
                <section className='fit-content'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste corporis sunt culpa illum assumenda ex iusto totam mollitia facere. Libero deserunt natus ea ad sint ex voluptates repellendus architecto tenetur!
                </section>
                <section className='fit-content'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem facere fuga rerum. Voluptate molestiae assumenda dicta velit perferendis exercitationem ratione eligendi amet, modi soluta praesentium fugit, quidem alias voluptatum illo iure. Beatae nobis ipsam dolor quam, ex, nesciunt ea pariatur in quas quo debitis, corrupti illum provident laborum cum expedita!
                </section>
            </Modal>
        </React.Fragment>
    )
}

export default ModalDemo;