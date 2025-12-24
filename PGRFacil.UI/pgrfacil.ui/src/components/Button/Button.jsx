import { useButton } from './useButton';

export const Button = ({count, setCount}) => {
    const {count2} = useButton({count});

    return (
        <button onClick={() => setCount((count) => count + 1)}>
            count is {count} and {count2}
        </button>
    )
}
