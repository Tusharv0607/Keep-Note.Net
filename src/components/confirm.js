import React, { useState } from "react";

const ConfirmModal = ({ children, description }) => {
    const [open, setOpen] = useState(false);
    const [callback, setCallback] = useState(null);

    const show = callback => event => {
        event.preventDefault();
        setOpen(true);
        event = {
            ...event,
            target: { ...event.target, value: event.target.value }
        }
        setCallback({
            run: () =>
                callback(event)
        });
    };

    const hide = () => {
        setCallback(null);
        setOpen(false);
    };

    const confirm = () => {
        console.log("confirm");
        callback.run();
        hide();
    };

    return (
        <>
            {children(show)}
            {open && (
                <>
                    <p>{description}</p>
                    <button onClick={hide}>Cancel</button>
                    <button onClick={confirm}>delete</button>
                </>
            )}
        </>
    );
};
export default ConfirmModal;
