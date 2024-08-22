import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "@/auth/current-user-decorator";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { UserPayload } from "@/auth/jwt.strategy";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";
import { z } from "zod";

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
})

const createQuestionValidationType = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
    export class CreateQuestionController {
    constructor(
        private prisma: PrismaService
    ) { }

    @Post()
    async handle(
        @Body(createQuestionValidationType) body: CreateQuestionBodySchema,
        @CurrentUser() user: UserPayload
    ) {
        const {content, title} = body
        const userId = user.sub

        await this.prisma.question.create({
            data: {
                content,
                title,
                slug: this.stringToSlug(title),
                authorId: userId
            }
        })
    }

    private stringToSlug(title: string): string {
        return title.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
}

