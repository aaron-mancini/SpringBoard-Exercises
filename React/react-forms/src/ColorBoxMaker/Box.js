const Box = ({ backgroundcolor, height, width, removeBox, id }) => {
    const styles = {
        backgroundColor: backgroundcolor,
        height: `${height}px`,
        width: `${width}px`
    }
    const handleClick = evt => {
        removeBox(evt.target.id)
    }
    return (
    <>
        <div 
            style={styles}
            data-testid={id}
        >    
        </div>
        <button id={id} onClick={handleClick}>X</button>
    </>
    );
}

export default Box;