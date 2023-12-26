import { useState } from 'react';

function Heading() {
    const [count, setCount] = useState(0);
        
    return (
        <>
        <h1>Heading</h1>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
            </button>
            <p>
            Edit <code>src/components/Heading.tsx</code> and save to test HMR
            </p>
        </div>
        </>
    );
}

export default Heading;
