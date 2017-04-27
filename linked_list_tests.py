
import unittest
from linked_list import *



class TestList(unittest.TestCase):
    def test_Pair_01(self):
        self.assertEqual(Pair(2, None).first, 2)

    def test_Pair_02(self):
        self.assertEqual(Pair(2, None).rest, None)

    def test_repr_01(self):
        self.assertEqual(repr(Pair(2, None)), 'Pair(2, None)')



    def test_empty_list_01(self):
        self.assertEqual(empty_list(), None)

    def test_add_01(self):
        self.assertEqual(add(None, 0, 5), Pair(5, None))

    def test_add_02(self):
        List = Pair(1, Pair(3, Pair(9, None)))
        self.assertEqual(add(List, 1, "hollup"), Pair(1, Pair("hollup", Pair(3, Pair(9, None)))))

    def test_add_03(self):
        self.assertRaises(IndexError, add, Pair(10, Pair(2, Pair(19, None))), 20, 20)
        '''with self.assertRaises(IndexError):
            List = Pair(10, Pair(2, Pair(19, None)))
            add(List, 20, 20)'''

    def test_length_01(self):
        self.assertEqual(length(None), 0)

    def test_length_02(self):
        self.assertEqual(length(Pair(2, Pair(10, Pair(9, None)))), 3)

    def test_get_01(self):
        with self.assertRaises(IndexError):
            get(Pair(1, None), 3)

    def test_get_02(self):
        self.assertEqual(get(Pair(2, Pair(18, Pair(36, None))), 1), 18)

    def test_set_01(self):
        with self.assertRaises(IndexError):
            set(Pair(1, None), 3, 'a')

    def test_set_02(self):
        self.assertEqual(set(Pair(8, Pair(2, Pair(6, None))), 2, 'abc'), Pair(8, Pair(2, Pair('abc', None))))

    def test_remove_01(self):
        self.assertRaises(IndexError, remove, Pair(1, Pair(2, None)), 6)
        '''with self.assertRaises(IndexError):
            print ('made it')
            remove(Pair(1, Pair(2, None)), 6)'''

    def test_remove_02(self):
        self.assertRaises(IndexError, remove, None, -1)
        '''with self.assertRaises(IndexError):
            remove(None, -1)'''

    def test_remove_03(self):
        self.assertRaises(IndexError, remove, Pair(1, None), -20)
        '''with self.assertRaises(IndexError):
            remove(Pair(1, None), -20)'''

    def test_remove_04(self):
        self.assertRaises(IndexError, remove, None, 0)
        '''with self.assertRaises(IndexError):
            remove(None, 0)'''

    def test_remove_05(self):
        self.assertEqual(remove(Pair(3, Pair(5, Pair(2, None))), 1), (5, Pair(3, Pair(2, None))))



if (__name__ == '__main__'):
    unittest.main()





