import React from 'react';

const Session = () => {
    const fileInput = React.createRef<HTMLInputElement>();
    const handleLoad = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (fileInput.current && fileInput.current.files) {
            const sessionFile = fileInput.current.files[0]
            console.log(sessionFile)
        }
    }
    return (
        <div className="Session">
            <button>Save session</button>
            <div className="vl"></div>
            <form onSubmit={handleLoad}>
                <input type="file" ref={fileInput} />
                <button type="submit">Load</button>
            </form>
        </div>
    );
}

export default Session