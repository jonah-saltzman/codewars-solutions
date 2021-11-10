# python | 'pete the baker' | 5kyu
# codewars url: https://www.codewars.com/kata/525c65e51bf619685c000059/

import math

def cakes(recipe, available):

    # variable to keep track of lowest ratio between available : recipe
    factor = None

    for item in recipe:
        # if the recipe item is available
        if item in available:
            tempFactor = available[item] / recipe[item]
            # if factor has already been set to something other than None
            if factor:
                # if ratio between this item's available : recipe amount 
                # is less than current lowest ratio, set it as lowest ratio
                if tempFactor < factor:
                    factor = tempFactor
            # if this is the first recipe item examined, no comparison necessary
            else:
                factor = tempFactor
        # if any recipe item is not available, return 0
        else:
            return 0
    # return greatest integer less than the lowest available : recipe ratio
    return math.floor(factor)
