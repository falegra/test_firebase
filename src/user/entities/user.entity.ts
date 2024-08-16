import { Roles } from "src/common/enum/roles.enum";
import { Profile } from "src/profile/entities/profile.entity";

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdDate: string;
    verificationCode: string | null;
    role: Roles;
    profileImage: string | null;
    isActive: boolean;
    profile: string | Profile | null;
}