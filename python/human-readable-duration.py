# python | 'human readable duration format' | 4kyu
# codewars url: https://www.codewars.com/kata/52742f58faf5485cae000b9a/

# dict containing unit values in seconds
units = {
    'year': 31536000,
    'day': 86400,
    'hour': 3600,
    'minute': 60,
    'second': 1
}

# main function
def format_duration(time):

    # dict for tallying number of each unit in 'time'
    results = {
        'year': 0,
        'day': 0,
        'hour': 0,
        'minute': 0,
        'second': 0
    }

    # catch zero/empty arguments
    if time in (0, ''):
        return 'now'

    # subtract largest possible unit (in seconds) from time
    # until remaining time is 0
    while time != 0:
        if time - units['year'] >= 0:
            time = time - units['year']
            results['year'] += 1
        elif time - units['day'] >= 0:
            time = time - units['day']
            results['day'] += 1
        elif time - units['hour'] >= 0:
            time = time - units['hour']
            results['hour'] += 1
        elif time - units['minute'] >= 0:
            time = time - units['minute']
            results['minute'] += 1
        else:
            time = time - units['second']
            results['second'] += 1

    # count number of non-zero units and remove all others
    # from 'results' dict
    unitCount = 0
    pop = []
    for unit in results:
        if results[unit] != 0:
            unitCount += 1
        else:
            pop.append(unit)
    for unit in pop:
        results.pop(unit)
    
    # generate list 'strings' containing properly-formatted
    # human-readable strings (no separators yet)
    strings = []
    for element in results:
        strings.append(formatUnit(element, results[element]))

    # add appropriate separators to strings in 'strings' according to
    # number of unedited strings remaining; add new string to 'separatedStrings'
    separatedStrings = []
    for unit in strings:
        if unit == strings[0]:
            unitCount -= 1
            tempStr = unit
        else:
            if unitCount >= 2:
                tempStr = ", " + unit
                unitCount -= 1
            elif unitCount == 1:
                tempStr = " and " + unit
                unitCount -= 1
        separatedStrings.append(tempStr)
    
    # combine all strings in list 'separatedStrings' into
    # single string, and return that string
    resultStr = ""
    for string in separatedStrings:
        resultStr += string
    return resultStr

# given a name of unit (string) and quantity, generate 
# full human-readable string containing unit & quantity
# add s for plural units
def formatUnit(unit, n):
    string = str(n) + " " + unit
    if n == 1:
        return string
    return string + "s"