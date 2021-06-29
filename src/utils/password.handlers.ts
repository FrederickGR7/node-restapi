import bycript from 'bcryptjs';

export const encryptPassword = async (password: string): Promise<string> => {
    const salt = await bycript.genSalt()
    return await bycript.hash(password, salt)
}

export const comparePassword = async (receivedPassword: string, password: string): Promise<boolean> => {
    return await bycript.compare(receivedPassword, password);
}