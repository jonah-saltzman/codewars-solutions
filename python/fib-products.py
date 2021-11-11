def main():
    prod = 5895
    print(productFib(prod))

def productFib(prod):
    smallestProd = 0
    n = -1
    equalProd = False
    while smallestProd < prod:
        n += 1
        x = findFib(n)
        y = findFib(n + 1)
        smallestProd = x * y
        if smallestProd == prod:
            equalProd = True
            break
    return [x, y, equalProd]

def findFib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    return findFib(n - 1) + findFib(n - 2)

if __name__ == "__main__":
    main()
