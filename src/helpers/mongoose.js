const handleValidatorErrors = errors => {
  let errorsToReturn = [];

  if(errors.length) {
    errors.forEach(error => {
      Object.keys(error).forEach(field => errorsToReturn.push(error[field].message))
    });
  
  }else {
    Object.keys(errors).forEach(field => errorsToReturn.push(errors[field].message));
  }

  return errorsToReturn;
}

module.exports = { handleValidatorErrors };