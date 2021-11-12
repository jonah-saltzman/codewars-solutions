def main():
    string = "apples, pears # and bananas\ngrapes\nbananas !apples"
    markers = ["#", "!"]
    print(solution(string, markers))

def solution(string, markers):
    lines = string.split("\n")
    results = []
    for line in lines:
        tempLine = None
        for marker in markers:
            if marker in line:
                tempLine = line[0:line.find(marker)]
        results.append(tempLine) if tempLine else results.append(line)
    trimmed = []
    for line in results:
        if line[-1] == " ":
            trimmed.append(line[0:-1])
        else:
            trimmed.append(line)
    final = ""
    for line in trimmed:
        br = line + "\n"
        final += br
    if final[-1] == "\n":
        final = final[0:-1]
    return final

if __name__ == "__main__":
    main()
