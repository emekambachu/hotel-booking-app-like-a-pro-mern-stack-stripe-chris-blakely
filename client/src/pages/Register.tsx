import {useForm} from "react-hook-form";

type RegisterFormData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

const Register = () => {

    const {register} = useForm<RegisterFormData>();

    return (
        <form
            className="flex flex-col gap-5"
        >
            <h2 className="text-3xl font-bold">
                Create An Account
            </h2>
            <div className="flex flex-col md:flex-row gap-5">

                <label className="tet-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("first_name", {
                            required: {
                                value: true,
                                message: "First name is required"
                            }
                        })}
                    ></input>
                </label>

                <label className="tet-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("last_name", {
                            required: {
                                value: true,
                                message: "Last name is required"
                            },
                        })}
                    ></input>
                </label>

            </div>

            <div className="flex flex-col md:flex-row gap-5">
                <label className="tet-gray-700 text-sm font-bold flex-1">
                    Email
                    <input
                        type="email"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            }
                        })}
                    ></input>
                </label>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
                <label className="tet-gray-700 text-sm font-bold flex-1">
                    Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    ></input>
                </label>

                <label className="tet-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("confirm_password", {
                            required: {
                                value: true,
                                message: "Confirm password is required"
                            },
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    ></input>
                </label>
            </div>

        </form>
    )

}

export default Register;