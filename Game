
Game_Layer = Layer:new("游戏层")

local game_text = "游戏"
local over_text = "结束"
local monster = "怪物"

local is_over = false
local mode = 0
local row_num = 12
local is_init = false
local monster_pos = {}
local rand_monster = {}
local init_finished = false
local create_interval = 0.01
local schedule_1 = create_interval

function Game_Layer:Init()
	local game = self:findObject(game_text)
	local over = self:findObject(over_text)
	mode = self:getData("模式")
	self.game_node = game[1]
	self.over_node = over[1]
	self.time = 0
	self.step = 0
	is_over = false
	
	self.create_num = 0--创建个数
	init_finished = false
	
	self.combineArray = {}
	self.checkArray = {}

	self.game_node:SetData("可点击", false)
	rand_monster = self:getRandomMonster()
	monster_pos = self:getMonsterPos()
	
	local text = nil
	if mode == 0 then
		text = self.step .."/22"
	elseif mode == 1 then
		text = self.step
	end
	
	self.game_node:SetData("步数", text)
	self.game_node:SetData("更新步数", true)
	
end

function Game_Layer:Simulate(dt)
	if is_init == false then
		local game = self:findObject(game_text)
		if game[1] then
			self:Init()
			is_init = true
		end
	end
	if self.game_node then
		if self.game_node:GetData("点击") then
			local select_num = self.game_node:GetData("选中")
			self:changeColor(select_num)
			self:getCombineArray(select_num)
			self.game_node:SetData("点击", false)
		end
		if init_finished == false then
			schedule_1 = schedule_1 - dt
			if schedule_1 <= 0 then
				schedule_1 = create_interval
				if self.create_num < 144 then
					for i = 1,12 do
						local num = self.create_num + 1 
						self:createMonster(num)
					end
				else
					init_finished = true
					self:getCheckArray()
					self.game_node:SetData("可点击", true)
				end
			end
		end
	end
	if self:getData("退出") then
		is_init = false
		init_finished = false
	end
	
	if self.over_node then
		if self.over_node:GetData("重来") then
			self:restartGame()
			self.over_node:SetData("重来",false)
		end
	end
	
	self:timer(dt)
end

function Game_Layer:createMonster(num)
	local tbl = {}
	local x = monster_pos[num].x
	local y = monster_pos[num].y
	local id = self:createObject(monster,x,y)
	tbl.id = id
	tbl.index = num
	tbl.type = rand_monster[num].type
	tbl.id:SetData("索引", tbl.index)
	tbl.id:SetData("种类", tbl.type)
	tbl.id:SetData("改变纹理", true)
	table.insert(self.checkArray,tbl)
	self.create_num = self.create_num + 1
end

function Game_Layer:restartGame()
	self.time = 0
	self.step = 0
	is_over = false
	
	self.combineArray = {}
	self.checkArray = {}
	
	local obj = self:findObject(monster)
	local tbl_monster = {}
	for k, v in pairs(obj) do
		local index = v:GetData("索引")
		tbl_monster[index] = v
	end
	
	local rand_monster = self:getRandomMonster()
	for i = 1 ,#tbl_monster do
		local tbl = {}
		tbl.id = tbl_monster[i]
		tbl.index = tbl.id:GetData("索引")
		tbl.type = rand_monster[i].type
		tbl.id:SetData("种类", tbl.type)
		tbl.id:SetData("改变纹理", true)
		table.insert(self.checkArray,tbl)
	end
	local text = nil
	if mode == 0 then
		text = self.step .."/22"
	elseif mode == 1 then
		text = self.step
	end
	
	self.game_node:SetData("步数", text)
	self.game_node:SetData("更新步数", true)
	self:getCheckArray()
	self.game_node:SetData("可点击", true)
end

function Game_Layer:isInTable(num,tbl)
	if tbl == nil then
		return false
	end
	for k,v in pairs(tbl) do
		if v.index == num then
			return true
		end
	end
	return false
end

function Game_Layer:getCheckArray()

	self.combineArray[1] = self.checkArray[1]
	table.remove(self.checkArray, 1)
	local type = self.combineArray[1].type
	self:getCombineArray(type)
	
end

function Game_Layer:changeColor(num)
	
	local select_num = self.game_node:GetData("选中")
	if select_num ~= self.combineArray[1].type then
		self.step = self.step + 1
		
		local text = nil
		if mode == 0 then
			text = self.step .."/22"
		elseif mode == 1 then
			text = self.step
		end
		
		if mode == 0 then
			if self.step >= 22 then
				is_over = true
				local best_step = self:getData("最佳步数")
				local best_time = self:getData("历史时间")
				local time2 = self:getTimeStr(best_time)
				self.over_node:SetData("最佳步数", best_step)
				self.over_node:SetData("最短用时", time2)
				self.game_node:SetData("可点击", false)
				self.over_node:SetData("完成", false)
				self.over_node:SetData("出现", true)
			end
		end

		self.game_node:SetData("步数", text)
		self.game_node:SetData("更新步数", true)
	end	
	
	for k,v in pairs(self.combineArray) do
		v.type = num
		v.id:SetData("种类", num)
		v.id:SetData("改变纹理", true)
	end
end

--获取怪物合成表(从未检测表中获取符合条件的对象)
function Game_Layer:getCombineArray( num)
	local function func()
	local is_find = false
	for k, v in pairs(self.checkArray) do
		local type = v.type
		if num == type then
			local isHave = false
			local n = v.index - 1 --左
			if n >= 1 and n <= 144 and not isHave and v.index % row_num ~= 1 then
				isHave = self:isInTable(n, self.combineArray)
				if isHave then
					table.insert(self.combineArray, v)
					table.remove(self.checkArray, k)
					is_find = true
				end
			end		
			n = v.index + 1 --右
			if n >= 1 and n <= 144 and not isHave and n % row_num ~= 1 then
				isHave = self:isInTable(n, self.combineArray)
				if isHave then
					table.insert(self.combineArray, v)
					table.remove(self.checkArray, k)
					is_find = true
				end
			end		
			n = v.index - row_num --上
			if n >= 1 and n <= 144 and not isHave then
				isHave = self:isInTable(n, self.combineArray)
				if isHave then
					table.insert(self.combineArray, v)
					table.remove(self.checkArray, k)
					is_find = true
				end
			end			
			n = v.index + row_num --下
			if n >= 1 and n <= 144 and not isHave then
				isHave = self:isInTable(n, self.combineArray)
				if isHave then
					table.insert(self.combineArray, v)
					table.remove(self.checkArray, k)
					is_find = true
				end
			end		
		end
	end
	if is_find == true then
		func()
	end
	end
	
	func()
	
	if #self.combineArray == 144 then
		is_over = true
	
		local best_step = self:getData("最佳步数")
		local best_time = self:getData("历史时间")
		if best_step == 0 or self.step <= best_step then
			best_step = self.step
			if best_time == 0 or self.time < best_time then
				best_time = self.time
			end
		end

		local time = self:getTimeStr(self.time)
		local time2 = self:getTimeStr(best_time)
		self.game_node:SetData("可点击", false)
		self.over_node:SetData("步数", self.step)
		self.over_node:SetData("当前用时", time)
		self.over_node:SetData("最佳步数", best_step)
		self.over_node:SetData("最短用时", time2)
		self.over_node:SetData("完成", true)
		self.over_node:SetData("出现", true)
	
		self:setData("历史时间", best_time)
		self:setData("最佳步数", best_step)
		self:setData("保存数据", true)
	end

end

function Game_Layer:getTimeStr(time)
	local minute = math.modf(time / 60)
	local sec = math.modf(time % 60)
	
	minute = string.format("%02d",minute)
	sec = string.format("%02d",sec)

	local str = minute.."/".. sec
	return str
end

function Game_Layer:timer(dt)
	if is_over == false then
		if self.time then
			self.time = self.time + dt
			local min = math.modf(self.time / 60)
			local sec = math.modf(self.time % 60)
	
			min = string.format("%02d",min)
			sec = string.format("%02d",sec)
			
			local time = min..".".. sec
			self.game_node:SetData("时间", time)
			self.game_node:SetData("更新时间", true)
		end
	end
end

function Game_Layer:getMonsterPos()
	local x = 49
	local y = 817
	local tbl_pos = {}
	
	local n = 1
	 for i = 1, 12 do
	     for j = 1, 12 do
	        	local pos = {}
				pos.x = x + (j -1)*49
				pos.y = y - (i-1)*49
	            tbl_pos[n] = pos
				n = n + 1	
	     end	 
	 end 
	
	return tbl_pos
end

--获取怪物随机表
function Game_Layer:getRandomMonster()
	math.randomseed(os.time())
	local tbl_rand = {}
	local total_num = 144
	
	local function is_exist(n)
		for k,v in pairs(tbl_rand) do
			if v.index == n then
				return true
			end
		end
		return false
	end
	
	local num_1 = math.random(28,30)
	local num_2 = math.random(25,30)
	local num_3 = math.random(20,25)
	local num_4 = math.random(20,22)
	local num_5 = math.random(18,20)
	local num_6 = 144 -(num_1 + num_2 + num_3 + num_4 + num_5)
	
	for i = 1,144 do
		local rand = 0
		local tbl = {}
		local exist = true
		while exist == true do
			rand = math.random(1,total_num)
			exist = is_exist(rand)
		end
	
		tbl.index = rand
	
	    local mon_type = 0
		if i >= 1 and i <= num_1 then--怪物1
			mon_type = 1
		elseif i > num_1 and i <= num_1+num_2 then--怪物2
			mon_type = 2
		elseif i > num_1+num_2 and i <= num_1+num_2+num_3 then--怪物3
			mon_type = 3
		elseif i > num_1+num_2+num_3 and i <= num_1+num_2+num_3+num_4 then--怪物4
			mon_type = 4
		elseif i > num_1+num_2+num_3+num_4 and i <= num_1+num_2+num_3+num_4+num_5 then--怪物5
			mon_type = 5
		elseif i > num_1+num_2+num_3+num_4+num_5 and i <= 144 then--怪物6
			mon_type = 6
		end

		tbl.type = mon_type
		tbl_rand[tbl.index] = tbl
	end
	
	return tbl_rand

end
