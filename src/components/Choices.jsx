export default function Choices(props) {


    const choices = props.choices.map((item) => {
        const stylesUnScored = {
            backgroundColor: item.isSelected ? '#D6DBF5' : '#F5F7FB'
        }
        let scoreColor = ''
        if (props.isScored) {

            if (item.isSelected && !item.isCorrect) {
                scoreColor = '#F8BCBC'
            } else if (item.isCorrect) {
                scoreColor = '#94D7A2'
            }

        }
        const stylesScored = {
            backgroundColor: scoreColor,
            color: item.isCorrect ? 'black' : 'gray',
            fontWeight: item.isCorrect ? '500' : '400',
            border: '1px solid lightgray'
        }

        return (<p
            style={props.isScored ? stylesScored : stylesUnScored}
            key={item.id}
            onClick={() => props.selectChoice(item.id)}
            className="choice">
            {item.value}
        </p>)
    })
    return (
        <div className="choices">{choices}</div>
    )
}