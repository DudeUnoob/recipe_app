import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";

class GetPersonalizedRecommendations extends Service {

    constructor(broker: ServiceBroker) {
        super(broker);

        this.parseServiceSchema({
            name: "getPersonalizedRecommendations",
            actions: {
                getPersonalizedRecommendations: {
                    params: {
                        user_id: "string",
                        userPreferences: "string"
                    },

                    async handler(ctx: Context<{ user_id: string, userPreferences: string }>) {
                        const{ user_id, userPreferences } = ctx.params;

                        return { message: user_id + userPreferences }
                    }
                }
            }
        })
    }
}

export default GetPersonalizedRecommendations