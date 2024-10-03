import s from './BoardCounter.module.css'

type BoardCounterPropType = {
    maxValue: number
    counter: number
}

export const BoardCounter = ({
    counter,
    maxValue
}: BoardCounterPropType) => {
    const stylesBoard = `${s.textBoard} ${counter === maxValue ? s.maxNumber : ''}`;

    return (
        <div className={s.board}>
            <p className={stylesBoard}>
                {counter}
            </p>
        </div>
    )
}