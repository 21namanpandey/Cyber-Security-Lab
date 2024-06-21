import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearAllUserError, signup } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, isAuthenticated, error } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleSignup = () => {
        dispatch(signup(email, password));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserError());
        }
        if (isAuthenticated) {
            navigateTo("/login");
        }
    }, [dispatch, isAuthenticated, error, loading]);

    return (
        <div className="w-full lg:grid lg:min-h-[100vh] xl:min-h-[100vh]">
            <div className="min-h-[100vh] flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Signup</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to signup to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {loading ? (
                            <SpecialLoadingButton content={"Logging In"} />
                        ) : (
                            <Button
                                type="submit"
                                className="w-full"
                                onClick={handleSignup}
                            >
                                Signup
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
