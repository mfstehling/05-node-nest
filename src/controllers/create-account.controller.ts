import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { hash } from "bcryptjs";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";
import { z } from "zod";

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
    constructor(
        private prismaService: PrismaService
    ) { }

    @Post()
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {
        const { name, email, password } = body;

        const userWithSameEmail = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if (userWithSameEmail) {
            throw new ConflictException('Email already exists')
        }


        const hashedPassword = await hash(password, 8)
        await this.prismaService.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    }
}