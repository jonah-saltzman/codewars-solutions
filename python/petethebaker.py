import math

def main():
    recipe = {
        'flour': 500,
        'sugar': 200,
        'eggs': 1
        }

    ingredients = {
        'flour': 1200,
        'sugar': 1200,
        'eggs': 5,
        'milk': 200
        }
    print(recipe)
    print(ingredients)
    print(cakes(recipe, ingredients))

def cakes(recipe, available):
    factor = None
    for item in recipe:
        if item in available:
            tempFactor = available[item] / recipe[item]
            if factor:
                if tempFactor < factor:
                    factor = tempFactor
            else:
                factor = tempFactor
        else:
            return 0
    return math.floor(factor)

if __name__ == "__main__":
    main()
