#REACT - JSX

## Setup
anywhere you are using jsx you have to import the React library

  // vanilla react
  // return ce('div', null, ce('h1', { style: { color: props.color } }, props.title));
  
  // in jsx
  const style={ color: props.color };

  return (
    <div>
      <h1 style={style}>{props.title}</h1>
    </div>
  )
   
    curly braces to interpolate a js expression
   >  { js_expression }
   
   if the js_expression is a js object it could look like 
   
   > { { color: 'blue'} }
   
 ## Self closing
 All tags have to be closed, like xml.