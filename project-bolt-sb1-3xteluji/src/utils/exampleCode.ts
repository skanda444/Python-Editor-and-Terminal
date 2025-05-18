export const exampleCode: Record<string, string> = {
  "Hello World": `# Simple Hello World program
print("Hello, World!")`,

  "Variables and Data Types": `# Variables and data types in Python
name = "John"
age = 30
height = 5.9
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")
print(f"Is Student: {is_student}")

# Type checking
print(f"Type of name: {type(name)}")
print(f"Type of age: {type(age)}")
print(f"Type of height: {type(height)}")
print(f"Type of is_student: {type(is_student)}")`,

  "List Operations": `# Working with lists in Python
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

print("Original list:", fruits)
print("First fruit:", fruits[0])
print("Last fruit:", fruits[-1])
print("Sliced list:", fruits[1:3])

# List operations
fruits.append("fig")
print("After append:", fruits)

fruits.insert(1, "apricot")
print("After insert:", fruits)

fruits.remove("cherry")
print("After remove:", fruits)

popped = fruits.pop()
print("Popped item:", popped)
print("After pop:", fruits)

# List comprehension
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)`,

  "Functions": `# Functions in Python
def greet(name):
    """Function to greet a person"""
    return f"Hello, {name}!"

def add(a, b):
    """Function to add two numbers"""
    return a + b

def factorial(n):
    """Recursive function to calculate factorial"""
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

# Calling functions
print(greet("Alice"))
print(f"2 + 3 = {add(2, 3)}")
print(f"Factorial of 5 = {factorial(5)}")

# Lambda function
square = lambda x: x**2
print(f"Square of 4 = {square(4)}")`,

  "File Operations": `# File operations in Python
# Write to a file
with open("sample.txt", "w") as file:
    file.write("This is line 1\\n")
    file.write("This is line 2\\n")
    file.write("This is line 3\\n")

print("File written successfully!")

# Read from a file
try:
    with open("sample.txt", "r") as file:
        content = file.read()
        print("File content:\\n", content)
        
    # Read line by line
    with open("sample.txt", "r") as file:
        print("Reading line by line:")
        for i, line in enumerate(file, 1):
            print(f"Line {i}: {line.strip()}")
except FileNotFoundError:
    print("File not found!")`,

  "Error Handling": `# Error handling in Python
def divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        return "Error: Division by zero!"
    except TypeError:
        return "Error: Invalid types!"
    finally:
        print("Division operation attempted")

print(divide(10, 2))
print(divide(10, 0))
print(divide("10", 2))

# Custom exception
class NegativeNumberError(Exception):
    """Exception raised when a negative number is provided."""
    pass

def square_root(n):
    if n < 0:
        raise NegativeNumberError("Cannot calculate square root of a negative number")
    return n ** 0.5

try:
    print(f"Square root of 16: {square_root(16)}")
    print(f"Square root of -9: {square_root(-9)}")
except NegativeNumberError as e:
    print(e)`,

  "Classes and Objects": `# Classes and objects in Python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def greet(self):
        return f"Hello, my name is {self.name} and I am {self.age} years old."
    
    def have_birthday(self):
        self.age += 1
        return f"{self.name} is now {self.age} years old."

# Create instances
alice = Person("Alice", 30)
bob = Person("Bob", 25)

print(alice.greet())
print(bob.greet())
print(alice.have_birthday())

# Inheritance
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
        
    def study(self, subject):
        return f"{self.name} is studying {subject}."
    
    def greet(self):
        return f"{super().greet()} My student ID is {self.student_id}."

charlie = Student("Charlie", 20, "S12345")
print(charlie.greet())
print(charlie.study("Python Programming"))`,

  "Data Visualization": `# Data visualization with built-in Python
import math

# Generate data points
x_values = [i/10 for i in range(0, 63)]
sin_values = [math.sin(x) for x in x_values]
cos_values = [math.cos(x) for x in x_values]

# Create ASCII plot
width = 60
height = 20
plot = [[' ' for _ in range(width)] for _ in range(height)]

# Draw axes
for i in range(height):
    plot[i][width//2] = '|'
for i in range(width):
    plot[height//2][i] = '-'
plot[height//2][width//2] = '+'

# Plot sine wave
for i, x in enumerate(x_values):
    if i < width:
        y = sin_values[i]
        y_pos = int(height//2 - y * (height//2 - 1))
        if 0 <= y_pos < height:
            plot[y_pos][i] = '*'

# Display plot
print("ASCII Sine Wave Plot:")
for row in plot:
    print(''.join(row))

# Print x and y values
print("\\nSample Values:")
for i in range(0, min(len(x_values), 10)):
    print(f"sin({x_values[i]:.1f}) = {sin_values[i]:.4f}")`,
};