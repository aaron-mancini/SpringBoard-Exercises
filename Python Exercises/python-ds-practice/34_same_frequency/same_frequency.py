def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    list1 = [int(x) for x in str(num1)]
    list2 = [int(x) for x in str(num2)]
    unique_numbers = list(set(list1) & set(list2))
    for num in unique_numbers:
        if list1.count(num) != list2.count(num):
            return False
    return True
