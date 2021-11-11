import math

def main():
    prod = 4895
    print(productFib(prod))

def productFib(prod):
    sqrt = math.floor(math.sqrt(prod))
    m = -1
    fib = 0
    while fib < sqrt:
        m += 1
        fib = findFib(m)
    bigger = findFib(m + 1)
    smaller = findFib(m - 1)
    if fib * bigger == prod:
        return [fib, bigger, True]
    if smaller * fib == prod:
        return [smaller, fib, True]
    return [fib, bigger, False] if fib * bigger > prod else [smaller, fib, False]

def findFib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    return findFib(n - 1) + findFib(n - 2)

if __name__ == "__main__":
    main()
