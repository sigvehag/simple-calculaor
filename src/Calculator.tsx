import * as React from 'react';

import {Box} from "@mui/material";

import Screen from "./Screen";
import Buttons, {ActionType, ClickAction} from "./Buttons";

import "./calculator.css";
import {useCallback, useEffect, useState} from "react";


const Calculator = () => {
    const [storedNumber, setStoredNumber] = useState("0");
    const [currentNumber, setCurrentNumber] = useState<string>("0");
    const [activeAction, setActiveAction] = useState<ActionType>();
    const [storedAction, setStoredAction] = useState<ActionType>();
    const [hasDecimal, setHasDecimal] = useState(false);


    const storeNumberAndAction = useCallback(() => {
        setStoredNumber(currentNumber);
        setStoredAction(activeAction);
        setActiveAction(undefined);
        setHasDecimal(false);
    }, [activeAction, currentNumber]);

    const handleNumberInput = useCallback((clickAction: ClickAction) => {
        console.log(clickAction.number, activeAction, currentNumber, storedNumber);
        if (activeAction !== undefined) {
            storeNumberAndAction();
            setCurrentNumber(clickAction.number as string);
        } else {
            if (currentNumber === "0") {
                setCurrentNumber(clickAction.number as string);
            } else {
                setCurrentNumber(currentNumber + clickAction.number as string);
            }
        }
    }, [activeAction, currentNumber, storeNumberAndAction, storedNumber]);

    const handleDecimal = useCallback(() => {
        if (activeAction !== undefined) {
            storeNumberAndAction();
            setCurrentNumber("0.");
        } else {
            if (!hasDecimal) {
                setCurrentNumber(currentNumber + ".");
            }
        }
        setHasDecimal(true);
    }, [activeAction, currentNumber, hasDecimal, storeNumberAndAction]);

    const handlePercentage = useCallback(() => {
        const storedFloat = parseFloat(storedNumber);
        const currentFloat = parseFloat(currentNumber);

        if (storedFloat > 0) {
            const percentageValue = (storedFloat / 100) * currentFloat;
            setCurrentNumber(percentageValue.toString());
        } else {
            setCurrentNumber((currentFloat / 100).toString());
        }
    }, [currentNumber, storedNumber]);

    const handlePm = useCallback(() => {
        if (currentNumber === "0") {
            return;
        }

        if (currentNumber[0] === "-") {
            setCurrentNumber(currentNumber.slice(1));
        } else {
            setCurrentNumber("-" + currentNumber);
        }

    }, [currentNumber]);

    const handleEquals = useCallback(() => {
        const storedFloat = parseFloat(storedNumber);
        const currentFloat = parseFloat(currentNumber);
        let sum = 0;

        console.log(currentNumber);
        console.log(storedFloat, storedAction, currentFloat);

        switch (storedAction) {
            case "+":
                sum = storedFloat + currentFloat;
                break;
            case "-":
                sum = storedFloat - currentFloat;
                break;
            case "/":
                sum = storedFloat / currentFloat;
                break;
            case "x":
                sum = storedFloat * currentFloat;
                break;
        }
        setCurrentNumber(sum.toString());
        setStoredNumber("0");
    }, [currentNumber, storedAction, storedNumber]);

    const handleClear = useCallback(() => {
        setStoredNumber("0");
        setCurrentNumber("0");
        setActiveAction(undefined);
        setStoredAction(undefined);
        setHasDecimal(false);
    }, []);

    const onButtonClick = useCallback((clickAction: ClickAction) => {
        if (clickAction.clickType === "number") {
            console.log("Number clicked", clickAction)
            handleNumberInput(clickAction);
        } else if (clickAction.clickType === "decimal") {
            handleDecimal();
        } else if (clickAction.clickType === "action") {
            setActiveAction(clickAction.actionType);
        } else if (clickAction.clickType === "percentage") {
            handlePercentage();
        } else if (clickAction.clickType === "pm") {
            handlePm();
        } else if (clickAction.clickType === "equals") {
            handleEquals();
        } else if (clickAction.clickType === "clear") {
            handleClear();
        }
    }, [handleClear, handleDecimal, handleEquals, handleNumberInput, handlePercentage, handlePm]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            console.log(e.key);
            console.log(e.key && e.key === ",");
            if (e.key && /[0-9]/.test(e.key)) {
                onButtonClick({clickType: "number", number: e.key, actionType: undefined});
            } else if (e.key && /[+\-/]/.test(e.key)) {
                onButtonClick({clickType: "action", actionType: e.key as ActionType});
            } else if (e.key && /[*]/.test(e.key)) {
                onButtonClick({clickType: "action", actionType: "x"});
            } else if (e.key && /Enter|=/.test(e.key)) {
                onButtonClick({clickType: "equals"});
            } else if (e.key && /,/.test(e.key)) {
                onButtonClick({clickType: "decimal"});
            } else if (e.key && /Clear/.test(e.key)) {
                onButtonClick({clickType: "clear"});
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [onButtonClick])

    return (
        <Box sx={{flexGrow: 1}} className="calculator">
            <Screen currentNumber={currentNumber}/>
            <Buttons onButtonClick={onButtonClick} activeAction={activeAction}/>
        </Box>
    )


}

export default Calculator;