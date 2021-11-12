def main():
    string = '\n§'
    markers = ["#", "§"]
    print(solution(string, markers))


def solution(string, markers):
    print("input: ")
    print(repr(string))
    print("markers: ")
    print(markers)

    if string == "":
        return ""
    if string == " ":
        return " "

    lines = string.split("\n")
    

if __name__ == "__main__":
    main()
