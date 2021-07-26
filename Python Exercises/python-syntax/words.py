def print_upper_words(words, must_start_with):
    lower_case = []
    output = []
    for word in words:
        lower_case.append(word.lower())
    
    for letter in must_start_with:
       for word in lower_case:
           if word[0] == letter:
               output.append(word.upper())

    for word in output:
        print(word)

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"h", "y"})