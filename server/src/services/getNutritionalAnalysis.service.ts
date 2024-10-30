import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";
import { client } from "../functions/groq";
import { aiModel } from "../scripts/AIModel";
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

                        console.log("hitting nutrition endpoint")
                        const chatCompletion = await client.chat.completions.create({
                            messages: [{
                                role: 'user',
                                content: `Give me an indepth nutritional analysis based off the recipes in this message:
                                ${finalRecipe}`,
                            }],
                            model: aiModel

                        })

                        return { message: chatCompletion.choices[0].message.content }
                    }
                }
            }
        })
    }
}

export default GetNutritionalAnalysisService