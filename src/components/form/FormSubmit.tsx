import { Button, type ButtonProps } from "@heroui/button";

const FormSubmit = (props: ButtonProps) => {
    return ( <Button type="submit" color="primary" {...props}>
        {props.children}
    </Button> );
}
 
export default FormSubmit;