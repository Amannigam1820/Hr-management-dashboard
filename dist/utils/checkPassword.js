import bcrypt from "bcrypt";
export const isPasswordCorrectsssss = async (enteredPassword, password) => {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, password);
        console.log(isMatch);
        return isMatch;
    }
    catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};
