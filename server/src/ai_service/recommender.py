# server/src/ai_service/recommender.py

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

# Load your recipe data (name, ingredients, tags, etc.)
recipes_df = pd.read_csv('recipes.csv')  # Example CSV with your recipe data

# Create a feature combining ingredients and tags for each recipe
recipes_df['combined_features'] = recipes_df['ingredients'] + ' ' + recipes_df['tags']

# Convert text to a matrix of token counts
count_matrix = CountVectorizer().fit_transform(recipes_df['combined_features'])

# Compute the cosine similarity matrix
cosine_sim = cosine_similarity(count_matrix, count_matrix)

# Function to get recommendations
def get_recommendations(recipe_name, cosine_sim=cosine_sim):
    idx = recipes_df.index[recipes_df['name'] == recipe_name].tolist()[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:6]
    
    recipe_indices = [i[0] for i in sim_scores]
    return recipes_df['name'].iloc[recipe_indices].tolist()

# Flask route to handle recommendations
@app.route('/recommend_recipe', methods=['POST'])
def recommend_recipe():
    data = request.json
    recipe_name = data.get('recipe_name', '')

    recommendations = get_recommendations(recipe_name)
    return jsonify({"recommendations": recommendations})
