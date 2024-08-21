import { Body, ConflictException, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
    constructor(
        private prismaService: PrismaService,
        private jwt: JwtService
    ) { }

    @Post()
    
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async handle(@Body() body: AuthenticateBodySchema) {
        const {email, password} = body;

        const user = await this.prismaService.user.findUnique({where: {email}})

        if(!user) {
            throw new UnauthorizedException('User credentials not found')
        }

        const isPasswordCorrect = await compare(password, user.password)

        if(!isPasswordCorrect) {
            throw new UnauthorizedException('User credentials not found')

        }

        const accessToken = this.jwt.sign({sub: user.id})


        return {accessToken}
    }
}