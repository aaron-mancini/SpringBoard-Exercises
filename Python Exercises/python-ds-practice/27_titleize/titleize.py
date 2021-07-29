def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    phrase = phrase.lower()
    word_list = phrase.split(' ')
    capitalized = []
    for word in word_list:
        capitalized.append(''.join([letter.upper() if word.index(letter) == 0 else letter for letter in word]))
    return ' '.join(capitalized)


