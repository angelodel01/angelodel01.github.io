

class List:
    def __init__(self, capacity = 10):
        self.values = [None]*capacity
        self.size = 0
        self.capacity = capacity

    def __eq__(self, other):
        return (type(other) == type(self)
                and other.size == self.size and other.values[:self.size] == self.values[:self.size])

    def __repr__(self):
        return 'List(%r, %r)' % (self.size, self.values)

#-> List
#this function takes no arguments and returns an empty list
def empty_list():
    return List()


#List int AnyType -> List
#this function takes a List an index and an object of any value and returns a new List with the object inserted at the given index

def sup_add(lst, idx, val):
    new_lst = List()
    if lst.size == lst.capacity:
        new_lst.capacity = lst.capacity*2
        new_lst.values = [None]*lst.capacity

    for i in range(0, lst.size + 1, 1):
        if idx > i:
            new_lst.values[i] = lst.values[i]
            new_lst.size += 1
        elif idx == i:
            new_lst.values[i] = val
            new_lst.size += 1
        elif idx < i:
            new_lst.values[i] = lst.values[i-1]
            new_lst.size += 1
    return new_lst


def add(lst, idx, val):
    if lst == List() and idx == 0:
        #print ('gate0')
        lst.values[idx] = val
        lst.size += 1
        return lst

    elif idx < 0 or idx > lst.capacity:
        #print ('gate1')
        raise IndexError('index out of range')

    elif lst.size == lst.capacity:
        #print ('gate2')
        return sup_add(lst, idx, val)

    elif lst.size < lst.capacity:
        #print ('gate3')
        return sup_add(lst, idx, val)



#List -> int
#this function takes a List and returns the length of the real values within it
def length(lst):
    return lst.size

#List index-> AnyType
#this function takes a List and an index and returns the object at that index within the list
def get(lst, idx):
    if idx < 0 or idx > lst.capacity:
        raise IndexError('index out of range')
    else:
        return lst.values[idx]

#List index anytype -> List
#this function takes a List an index and an object of any type and returns a new list with the index replaced with the new object
def set(lst, idx, val):
    if idx < 0 or idx > lst.capacity:
        raise IndexError('index out of range')

    else:
        lst.values[idx] = val
    return lst

#List index anytype -> List
#this function takes a List and an index and removes the object at the index and returns the object and the resulting list as a tuple
def remove(lst, idx):
    if lst == List():
        return (None, None)

    elif idx > lst.size:
        raise IndexError('index out of range')

    else:
        new_list = List()
        for i in range(lst.size):
            if i < idx:
                new_list.values[i] = lst.values[i]
                new_list.size += 1

            elif idx <= i:
                new_list.values[i] = lst.values[i + 1]
                new_list.size += 1
        new_list.size -= 1
        return (lst.values[idx], new_list)



























