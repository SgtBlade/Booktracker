{
    
  const handleSubmit = (e, type, object = null) => {
    e.preventDefault();
    if(type === 'comment')object.addComment(store.user);
    else if(type === 'book')store.addbookPost();
  }

  const dateToString = (date, character = '/', reverse = true) => {
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    let yyyy = date.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    
    let formatted = '';
    (reverse) ? formatted = dd+character+mm+character+yyyy : formatted = yyyy+character+mm+character+dd;
    return  formatted;
  }
}