import * as React from 'react';
import {Box, Button, Grid} from "@mui/material";

type buttonType = 'number' | 'decimal' | 'action' | 'equals' | 'clear' | 'percentage' | 'pm';
export type ActionType = "+" | "-" | "/" | "x" | undefined;

type ItemProps = {
    type: buttonType;
    children: string;
    width?: number
}

export type ClickAction = {
    clickType: buttonType;
    number?: string;
    actionType?: ActionType;
}

type ButtonProps = {
    onButtonClick: (clickAction: ClickAction) => void;
    activeAction: ActionType;
}

const Buttons = ({onButtonClick, activeAction}: ButtonProps) => {
    const Item: React.FC<ItemProps> = ({type, children, width = 3}) => {
        const isActive = type === "action" && activeAction === children as ActionType;
        return (
            <Grid item xs={width}>
                <Button sx={{color: '#36234E', borderColor: '#36234E'}} variant={isActive ? "contained" : "outlined"} onClick={() => onButtonClick({
                    clickType: type,
                    number: type === 'number' ? children : undefined,
                    actionType: type === 'action' ? children as ActionType : undefined
                })}>{children}</Button>
            </Grid>
        )
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Item type='clear'>AC</Item>
                <Item type='pm'>+/-</Item>
                <Item type='percentage'>%</Item>
                <Item type='action'>/</Item>
                <Item type='number'>7</Item>
                <Item type='number'>8</Item>
                <Item type='number'>9</Item>
                <Item type='action'>x</Item>
                <Item type='number'>4</Item>
                <Item type='number'>5</Item>
                <Item type='number'>6</Item>
                <Item type='action'>-</Item>
                <Item type='number'>1</Item>
                <Item type='number'>2</Item>
                <Item type='number'>3</Item>
                <Item type='action'>+</Item>
                <Item type='number' width={6}>0</Item>
                <Item type='decimal'>.</Item>
                <Item type='equals'>=</Item>

            </Grid>
        </Box>

    )
}

export default Buttons;