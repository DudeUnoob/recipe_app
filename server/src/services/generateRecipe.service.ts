import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";


class GenerateRecipeService extends Service {

    constructor(broker: ServiceBroker){
        super(broker);

        this.parseServiceSchema({
            name: "generateRecipe",
            actions: {
                generateRecipe: {
                    params: {
                        ingredients: "string",
                        userPreferences: "string" 
                    },

                    async handler (ctx: Context<{ ingredients: string; userPreferences: string }>) {
                        const {ingredients, userPreferences} = ctx.params;


                        return { message: ingredients + userPreferences }
                    }
                }
            }
        })
    }


}

export default GenerateRecipeService