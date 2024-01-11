

export const photoFormUI = (styles,handleCaptionChange,handlePhotoChange,photo,handleSubmit,callback)=>{
       
    return (
        <form onSubmit={handleSubmit} style={styles.form}>
        <textarea 
        id="commentsTextArea" 
        style={
           {width:"30%",
           borderRadius:10,
           borderWidth:2,
           paddingLeft:2,
           backgroundColor:"none",
       }}  
        value={photo.caption} 
        rows={1}
        cols={30}
        onChange={handleCaptionChange} placeholder="add a caption" ></textarea>

        <input 
             type="file" 
             accept="image/*"
           //
             onChange={handlePhotoChange} />

        <input style={{backgroundColor:"none",borderRadius:10}} type="submit" value={"ok"} />
        </form>
    )
    
}