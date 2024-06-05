import Button from "../../../components/Button";
import Input from "../../../components/Input";


export default function LoginForm() {
    return (
        <form className=" max-w-[22rem] ml-16 mt-2 flex flex-col gap-4">
            <Input placeholder="Mobile or Email" />
            <Input placeholder="Password" />
            <Button type="submit" text="LOGIN" color="green" />
        </form>
    )
}