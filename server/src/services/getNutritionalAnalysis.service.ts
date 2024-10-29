import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";

class GetNutritionalAnalysisService extends Service {

    constructor(broker: ServiceBroker) {
        super(broker);

        this.parseServiceSchema({
            name:"getNutritionalAnalysis",
            actions: {
                getNutritionalAnalysis: {
                    params: {
                        finalRecipe: "string"
                    },

                    async handler(ctx: Context<{ finalRecipe: string }>) {

                        const { finalRecipe } = ctx.params;

                        return { message: finalRecipe }
                    }
                }
            }
        })
    }
}

export default GetNutritionalAnalysisService