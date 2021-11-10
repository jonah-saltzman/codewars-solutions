def main():
    time = 3662
    print(format_duration(time))
    return

def format_duration(time):
    units = {
        'year': 31536000,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
    }
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
    return results

if __name__ == "__main__":
    main()
