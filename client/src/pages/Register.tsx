import {useForm} from "react-hook-form";

type RegisterFormData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

const Register = () => {

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>();

    const onSubmit = handleSubmit((data) => {

        console.log("Form Data", data);

    });

    return (
        <form
            onSubmit={onSubmit}
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
                    {errors.first_name && (
                        <span className="text-red-500 text-sm">
                            {errors.first_name.message}
                        </span>
                    )}
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
                    {errors.last_name && (
                        <span className="text-red-500 text-sm">
                            {errors.last_name.message}
                        </span>
                    )}
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
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            {errors.email.message}
                        </span>
                    )}
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
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )}
                </label>

                <label className="tet-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("confirm_password", {
                            required: {
                                value: true,
                                message: "confirm password is required"
                            },
                            validate:(val) => {
                                if (val !== watch("password")) {
                                    return "Your passwords do not match";
                                }
                            }
                        })}
                    ></input>
                    {errors.confirm_password && (
                        <span className="text-red-500 text-sm">
                            {errors.confirm_password.message}
                        </span>
                    )}
                </label>
            </div>

            <span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-50"
                >
                    Create Account
                </button>
            </span>

        </form>
    )

}

export default Register;