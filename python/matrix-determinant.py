def main():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print(determinant(matrix))

# | 1  2  3 |
# | 4  5  6 |
# | 7  8  9 |

def determinant(matrix):
    return determinant2(matrix)

def determinant2(matrix):
    sum = 0
    if len(matrix) == 1:
        print("hit, returning matrix[0]: " + str(matrix[0]))
        return matrix[0]
    for i in range(len(matrix)):
        if i % 2 == 0:
            print("matrix[0][i]: " + str(matrix[0][i]))
            print(determinant2(getMinor(0, i, matrix)))
            print("adding...")
            sum += matrix[0][i] * determinant2(getMinor(0, i, matrix))
        else:
            print("matrix[0][i]: " + str(matrix[0][i]))
            print(determinant2(getMinor(0, i, matrix)))
            print("subtracting...")
            sum -= matrix[0][i] * determinant2(getMinor(0, i, matrix))
    return sum
    
def getMinor(yMaj, xMaj, matrix):
    targetLen = len(matrix) - 1
    minor = []
    if targetLen != 1:
        for _ in range(targetLen):
            minor.append([])

    # print(minor)
    temp = []

    for y in range(len(matrix)):
        for x in range(len(matrix)):
            if y == yMaj:
                continue
            if x == xMaj:
                continue
            temp.append(matrix[y][x])
    # print(temp)
    if len(temp) == 1:
        minor.append(temp[0])
        return minor
    for y in range(targetLen):
        for _ in range(targetLen):
            # print("attempting to pop from temp; temp length = " + str(len(temp)))
            minor[y].append(temp.pop(0))
    # print(minor)
    return minor

if __name__ == "__main__":
    main()
