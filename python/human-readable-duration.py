def main():
    time = 3662
    print(format_duration(time))
    return

units = {
    'year': 31536000,
    'day': 86400,
    'hour': 3600,
    'minute': 60,
    'second': 1
}

def format_duration(time):
    results = {
        'year': 0,
        'day': 0,
        'hour': 0,
        'minute': 0,
        'second': 0
    }

    while time != 0:
        if time - units['year'] > 0:
            time = time - units['year']
            results['year'] += 1
        elif time - units['day'] > 0:
            time = time - units['day']
            results['day'] += 1
        elif time - units['hour'] > 0:
            time = time - units['hour']
            results['hour'] += 1
        elif time - units['minute'] > 0:
            time = time - units['minute']
            results['minute'] += 1
        else:
            time = time - units['second']
            results['second'] += 1

    unitCount = 0
    pop = []
    for unit in results:
        if results[unit] != 0:
            unitCount += 1
        else:
            pop.append(unit)
    for unit in pop:
        results.pop(unit)
    
    strings = []
    for element in results:
        strings.append(formatUnit(element, results[element]))

    return strings

def formatUnit(unit, n):
    string = str(n) + " " + unit
    if n == 1:
        return string
    return string + "s"


if __name__ == "__main__":
    main()
