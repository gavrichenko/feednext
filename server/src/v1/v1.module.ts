// Nest dependencies
import { Module, MiddlewareConsumer } from '@nestjs/common'

// Local files
import { BlacklistMiddleware } from 'src/shared/Middleware/blacklist.middleware'
import { RedisService } from 'src/shared/Services/redis.service'
import { UserModule } from './User/user.module'
import { AuthModule } from './Auth/auth.module'
import { CategoryModule } from './Category/category.module'
import { EntryModule } from './Entry/entry.module'
import { TitleModule } from './Title/title.module'
import { MessageModule } from './Message/message.module'

@Module({
    imports: [
        UserModule,
        AuthModule,
        CategoryModule,
        EntryModule,
        TitleModule,
        MessageModule
    ],
    providers: [RedisService],
})

export class V1Module {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(BlacklistMiddleware).forRoutes('v1/auth/check-token', 'v1/auth/signout')
    }
}
