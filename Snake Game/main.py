import pygame
import sys
import random
from pygame.math import Vector2


class SNAKE:
    def __init__(self):
        self.body = [Vector2(5, 10), Vector2(4, 10), Vector2(3, 10)]  # positioning the snake
        self.direction = Vector2(0, 0)
        self.new_block = False

        self.head_up = pygame.image.load('Images/head_up.png').convert_alpha()
        self.head_down = pygame.image.load('Images/head_down.png').convert_alpha()
        self.head_right = pygame.image.load('Images/head_right.png').convert_alpha()
        self.head_left = pygame.image.load('Images/head_left.png').convert_alpha()

        self.tail_up = pygame.image.load('Images/tail_up.png').convert_alpha()
        self.tail_down = pygame.image.load('Images/tail_down.png').convert_alpha()
        self.tail_right = pygame.image.load('Images/tail_right.png').convert_alpha()
        self.tail_left = pygame.image.load('Images/tail_left.png').convert_alpha()

        self.body_vertical = pygame.image.load('Images/body_vertical.png').convert_alpha()
        self.body_horizontal = pygame.image.load('Images/body_horizontal.png').convert_alpha()

        self.body_tr = pygame.image.load('Images/body_tr.png').convert_alpha()
        self.body_tl = pygame.image.load('Images/body_tl.png').convert_alpha()
        self.body_br = pygame.image.load('Images/body_br.png').convert_alpha()
        self.body_bl = pygame.image.load('Images/body_bl.png').convert_alpha()
        self.crunch_sound = pygame.mixer.Sound('Sound/crunch.wav')

    def draw_snake(self):
        self.update_head_graphics()
        self.update_tail_graphics()

        for index, block in enumerate(self.body):
            x_pos = int(block.x * cell_size)
            y_pos = int(block.y * cell_size)
            block_rect = pygame.Rect(x_pos, y_pos, cell_size, cell_size)

            # direction of the face heading
            if index == 0:
                screen.blit(self.head, block_rect)

            elif index == len(self.body) - 1:
                screen.blit(self.tail, block_rect)

            else:
                previous_block = self.body[index + 1] - block
                next_block = self.body[index - 1] - block
                if previous_block.x == next_block.x:
                    screen.blit(self.body_vertical, block_rect)
                elif previous_block.y == next_block.y:
                    screen.blit(self.body_horizontal, block_rect)
                else:
                    if previous_block.x == -1 and next_block.y == -1 or previous_block.y == -1 and next_block.x == -1:
                        screen.blit(self.body_tl, block_rect)
                    elif previous_block.x == -1 and next_block.y == 1 or previous_block.y == 1 and next_block.x == -1:
                        screen.blit(self.body_bl, block_rect)
                    elif previous_block.x == 1 and next_block.y == -1 or previous_block.y == -1 and next_block.x == 1:
                        screen.blit(self.body_tr, block_rect)
                    elif previous_block.x == 1 and next_block.y == 1 or previous_block.y == 1 and next_block.x == 1:
                        screen.blit(self.body_br, block_rect)

    def update_head_graphics(self):
        head_relation = self.body[1] - self.body[0]
        if head_relation == Vector2(1, 0):
            self.head = self.head_left
        elif head_relation == Vector2(-1, 0):
            self.head = self.head_right
        elif head_relation == Vector2(0, 1):
            self.head = self.head_up
        elif head_relation == Vector2(0, -1):
            self.head = self.head_down

    def update_tail_graphics(self):
        tail_relation = self.body[-2] - self.body[-1]
        if tail_relation == Vector2(1, 0):
            self.tail = self.tail_left
        elif tail_relation == Vector2(-1, 0):
            self.tail = self.tail_right
        elif tail_relation == Vector2(0, 1):
            self.tail = self.tail_up
        elif tail_relation == Vector2(0, -1):
            self.tail = self.tail_down

    def move_snake(self):
        if self.new_block == True:
            body_copy = self.body[:]
            body_copy.insert(0, body_copy[0] + self.direction)
            self.body = body_copy[:]
            self.new_block = False

        else:
            body_copy = self.body[:-1]
            body_copy.insert(0, body_copy[0] + self.direction)
            self.body = body_copy[:]

    def add_block(self):  # adding another block to the snake after the snake eats a fruit
        self.new_block = True

    def play_crunch_sound(self):
        self.crunch_sound.play()

    def reset(self):  # restarting the game after collision with the screen or snake itself
        self.body = [Vector2(5, 10), Vector2(4, 10), Vector2(3, 10)]
        self.direction = Vector2(0, 0)


class FRUIT:
    def __init__(self):  # creating the positions for the fruits
        self.randomize()

    def draw_fruit(self):
        fruit_rect = pygame.Rect(int(self.pos.x * cell_size), int(self.pos.y * cell_size), cell_size,cell_size)  # creating a rectangle
        screen.blit(apple, fruit_rect)
        # pygame.draw.rect(screen,(126,166,114),fruit_rect)        # drawing the fruits

    def randomize(self):  # repositioning the fruits
        self.x = random.randint(0, cell_number - 1)
        self.y = random.randint(0, cell_number - 1)
        self.pos = Vector2(self.x, self.y)  # creating a 2d vector with the x,y values


class MAIN:
    def __init__(self):
        self.snake = SNAKE()  # creating a snake object
        self.fruit = FRUIT()  # creating a fruit object

    def update(self):
        self.snake.move_snake()
        self.check_collision()
        self.check_fail()

    def draw_elements(self):
        self.draw_grass()
        self.fruit.draw_fruit()
        self.snake.draw_snake()
        self.draw_score()

    def check_collision(self):
        if self.fruit.pos == self.snake.body[0]:  # if the snake collides with the fruits
            self.fruit.randomize()
            self.snake.add_block()
            self.snake.play_crunch_sound()  # added the crunch sound to the game

        for block in self.snake.body[1:]:
            if block == self.fruit.pos:
                self.fruit.randomize()

    def check_fail(self):
        # Checking if the snake hits the border
        if not 0 <= self.snake.body[0].x < cell_number or not 0 <= self.snake.body[0].y < cell_number:
            # Wrap around the screen
            if self.snake.body[0].x >= cell_number:
                self.snake.body[0].x = 0
            elif self.snake.body[0].x < 0:
                self.snake.body[0].x = cell_number - 1
            elif self.snake.body[0].y >= cell_number:
                self.snake.body[0].y = 0
            elif self.snake.body[0].y < 0:
                self.snake.body[0].y = cell_number - 1

        for block in self.snake.body[1:]:
            if block == self.snake.body[0]:
                self.game_over()

    def game_over(self):
        self.snake.reset()

    def draw_grass(self):
        grass_color = (167, 209, 61)
        for row in range(cell_number):
            if row % 2 == 0:
                for col in range(cell_number):
                    if col % 2 == 0:
                        grass_rect = pygame.Rect(col * cell_size, row * cell_size, cell_size, cell_size)
                        pygame.draw.rect(screen, grass_color, grass_rect)

            else:
                for col in range(cell_number):
                    if col % 2 != 0:
                        grass_rect = pygame.Rect(col * cell_size, row * cell_size, cell_size, cell_size)
                        pygame.draw.rect(screen, grass_color, grass_rect)

    def draw_score(self):
        score_text = str(len(self.snake.body) - 3)
        score_surface = game_font.render(score_text, True, (56, 74, 12))
        score_x = int(cell_size * cell_number - 40)  # positioning the score
        score_y = int(cell_size * cell_number - 800)
        score_rect = score_surface.get_rect(center=(score_x, score_y))
        apple_rect = apple.get_rect(midright=(score_rect.left, score_rect.centery))  # positioning the score apple

        screen.blit(score_surface, score_rect)
        screen.blit(apple, apple_rect)


pygame.mixer.pre_init(44100, -16, 2, 512)
pygame.init()
cell_size = 42  # creating the cells for the display surface
cell_number = 20
# adding a frame
screen = pygame.display.set_mode((cell_number * cell_size, cell_number * cell_size))  # The main display surface
clock = pygame.time.Clock()  # creating a clock object
apple = pygame.image.load('Images/Apple.png').convert_alpha()
game_font = pygame.font.Font(None, 50)  # adding a font to the score


def draw_start_menu():
    # Clear the screen
    screen.fill((0, 0, 0))

    # Draw menu text
    font_title = pygame.font.Font(None, 130)  # Larger font size for title
    font_menu = pygame.font.Font(None, 50)  # Normal font size for menu items

    title_text = font_title.render("GestureSway", True, (255, 255, 255))
    start_text = font_menu.render(" # Start  (Press S)", True, (255, 255, 255))
    quit_text = font_menu.render("# Quit  (Press Q)", True, (255, 255, 255))

    title_rect = title_text.get_rect(center=(screen.get_width() // 2, screen.get_height() // 3 - 50))
    start_rect = start_text.get_rect(center=(screen.get_width() // 2, screen.get_height() // 2))
    quit_rect = quit_text.get_rect(center=(screen.get_width() // 2, screen.get_height() // 2 + 50))

    screen.blit(title_text, title_rect)
    screen.blit(start_text, start_rect)
    screen.blit(quit_text, quit_rect)

    pygame.display.flip()


def start_game():
    main_game = MAIN()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    main_game.snake.direction = Vector2(0, -1)
                elif event.key == pygame.K_DOWN:
                    main_game.snake.direction = Vector2(0, 1)
                elif event.key == pygame.K_LEFT:
                    main_game.snake.direction = Vector2(-1, 0)
                elif event.key == pygame.K_RIGHT:
                    main_game.snake.direction = Vector2(1, 0)
                elif event.key == pygame.K_ESCAPE:
                    return False

        screen.fill((175, 215, 70))
        main_game.update()
        main_game.draw_elements()
        pygame.display.update()
        clock.tick(4)


# Game loop
running = True
start_menu = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if start_menu:
                if event.key == pygame.K_s:
                    start_menu = False
                elif event.key == pygame.K_q:
                    pygame.quit()
                    sys.exit()
            else:
                if event.key == pygame.K_ESCAPE:
                    start_menu = True
                    draw_start_menu()
    if start_menu:
        draw_start_menu()
    else:
        if not start_game():
            start_menu = True
            draw_start_menu()

    pygame.display.update()
    clock.tick(60)

pygame.quit()
