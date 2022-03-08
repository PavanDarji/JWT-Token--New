import { ExportCustomJobPage } from 'twilio/lib/rest/bulkexports/v1/export/exportCustomJob';
import Service from './Service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig';



class UserService extends Service {
    constructor(model) {
        super(model);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.changepassword = this.changepassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);

    }
    async signup(item) {
        try {

            let tempuser = await this.model.findOne({ "email": item.email });
            let mno = await this.model.findOne({ "mno": item.mno });

            if (!tempuser) {
                if (!mno) {
                    const hash = await bcrypt.hashSync(item.password, 10);
                    item.password = hash;
                    const data = await this.model.create(item);
                    return {
                        error: false,
                        statusCode: 202,
                        data: data,
                    };
                }
                else {
                    return {
                        error: true,
                        statusCode: 401,
                        error: ' Mobile already '
                    };
                }

            }
            else {
                return {
                    error: true,
                    statusCode: 401,
                    error: ' Email already '
                };
            }

        } catch (err) {
            return {
                error: true,
                statusCode: 501,
                message: 'Error in Signup',
                errors: err.errors,
            };
        }
    }

    //login
    async login(item) {
        try {

            let tempuser = await this.model.findOne({ "email": item.email })
            if (tempuser) {
                var checkPassword = await bcrypt.compareSync(item.password, tempuser.password);
                if (checkPassword) {
                    const token = jwt.sign({ userID: tempuser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '45m' })
                    return {
                        error: false,
                        token: token,
                        statusCode: 200,
                        data: tempuser
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 401,
                        error: 'wrong Email Or Password'
                    };
                }
            }
            else {
                return {
                    error: true,
                    statusCode: 401,
                    error: 'wrong Email Or Password'
                };
            }
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: 'server error'
                // ,errors: err.errors,
            };
        }
    }

    //verify token
    async jwt(token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(decode);
            // return {
            //     error: true,
            //     statusCode: 500,
            //     message: decode
            //     // ,errors: err.errors,
            // };
            let tempuser = await this.model.findOne({ "email": item.email })

        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: 'server error'
                // ,errors: err.errors,
            };
        }
    }

    //change Password

    async changepassword(data) {
        try {
            // console.log(data.body)
            const { password, cpassword } = data.body
            const decode = await jwt.verify(data.params, process.env.JWT_SECRET_KEY);
            if (password && cpassword) {
                if (password !== cpassword) {
                    return {
                        error: true,
                        statusCode: 500,
                        message: 'password is not match '
                    };
                }
                else {
                    const newhashPassword = await bcrypt.hash(password, 10)
                    const updatepass = await this.model.findByIdAndUpdate(decode.userID, {
                        $set: {
                            password: newhashPassword
                        }
                    })
                    return {
                        error: false,
                        statusCode: 200,
                        test: updatepass,
                        UserData: "Password Change Successfull..."
                    };
                }
            }
            else {
                return {
                    error: true,
                    statusCode: 400,
                    message: "All Fields are required"
                };
            }
            // const userdata = await this.model.findById(decode.userID).select(['-password']);
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: 'server error',
                errors: error.message
            };
        }
    }


    //  email send 

    async sendEmail(data) {
        const { email } = data.body
        console.log(email);
        if (email) {
            const user = await this.model.findOne({ email: email })

            if (user) {
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({ userID: user._id }, secret, {
                    expiresIn: '15m'
                })
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
                // console.log(link);

                //send email
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: user.email,
                    subject: "Password Reset Link",
                    html: `<a href=${link}>Click Here</a> to Reset Your Password`
                })
                //
                return {
                    error: false,
                    statusCode: 200,
                    test: info,
                    UserData: "Password Reset Link Sent in Email.....Please Check Your Email."
                };


            }
            else {
                return {
                    error: false,
                    statusCode: 200,
                    UserData: "Email Does not exists."
                };

            }
        } else {
            return {
                error: false,
                statusCode: 200,
                UserData: "Email Fields are required."
            };
        }
    }


    async resetPassword(data) {
        const user = await this.model.findById(data.id)
        console.log(data.id);
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(data.token, new_secret)
            if (data.password && data.cpassword) {
                if (data.password !== data.cpassword) {
                    return {
                        error: false,
                        statusCode: 200,
                        UserData: "Password And Confirm Password Not Match."
                    };

                }
                else {
                    const salt = await bcrypt.genSalt(10)
                    const newhashPassword = await bcrypt.hash(data.password, salt)
                    await this.model.findByIdAndUpdate(user._id, {
                        $set: {
                            password: newhashPassword
                        }
                    })
                    return {
                        error: false,
                        statusCode: 200,
                        password: newhashPassword,
                        UserData: "Password Reset Successfull..."
                    };

                }
            } else {
                return {
                    error: false,
                    statusCode: 200,
                    UserData: "All Fields are Required."
                };

            }
        } catch (error) {
            console.log(error);
            return {
                error: false,
                statusCode: 200,
                UserData: "Invalid Token."
            };

        }
    }

}


export default UserService;
