export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    author: {
        id: number;
        name: string;
    }
}

export interface DecodedToken {
    id: number;
    email: string;
    iat: number;
    exp: number;
}