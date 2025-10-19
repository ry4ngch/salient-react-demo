import React from "react";
import Grid, {GridRow, GridItem} from '../utils/Salient/UI/Grid/Grid';

const GridDemo = () => {
    return (
        <Grid>
            <GridRow>
                <GridItem>Row 1 - Item 1</GridItem>
                <GridItem>Row 1 - Item 2</GridItem>
                <GridItem>Row 1 - Item 3</GridItem>
            </GridRow>
            <GridRow>
                <GridItem>Row 2 - Item 1</GridItem>
                <GridItem>Row 2 - Item 2</GridItem>
                <GridItem>Row 2 - Item 3</GridItem>
                <GridItem>Row 2 - Item 4</GridItem>
            </GridRow>
            <GridRow>
                <GridItem>Row 3 - Item 1</GridItem>
                <GridItem>Row 3 - Item 2</GridItem>
                <GridItem>Row 3 - Item 3</GridItem>
                <GridItem>Row 3 - Item 4</GridItem>
                <GridItem>Row 3 - Item 5</GridItem>
            </GridRow>
        </Grid>
    )
}

export default GridDemo;