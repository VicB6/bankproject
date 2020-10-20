type fieldsToValidateTypes = (
    {
        userName: string;
        password?: undefined;
    } | {
        password: string;
        userName?: undefined;
    } | {
        userName: string;
        password?: undefined;
        cpassword?: undefined;
    } | {
        password: string;
        userName?: undefined;
        cpassword?: undefined;
    } | {
        cpassword: string;
        userName?: undefined;
        password?: undefined;
    })[];


export function validateFields(fieldsToValidate:fieldsToValidateTypes){
    return fieldsToValidate.every((field) => Object.values(field)[0] !== '');
  };