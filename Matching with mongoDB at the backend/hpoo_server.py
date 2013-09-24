#!/usr/bin/python
import tornado.web
import tornado.httpserver
import tornado.ioloop
import tornado.options
import collections
import os
import pymongo
import json,ast

class GetConnections(tornado.web.RequestHandler):
    def get(self):
        col = self.application.db.connections
        page = self.get_argument('page')
        row = col.find_one({'page': page})
        cons = ast.literal_eval(
                   json.dumps(
                       row['connections']
                   )
               )
        respdict = { 'connections': cons }
        print respdict
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(respdict)
        self.finish()

class SetConnections(tornado.web.RequestHandler):
    def post(self):
        col = self.application.db.connections
        reqdata = self.get_argument('reqdata')
        reqjson = json.loads(reqdata)
        print reqjson
        col.update({ 'page': reqjson['page'] }, \
                   { '$set': {'connections': reqjson['connections']} }, \
                   upsert=True)
        self.set_header("Access-Control-Allow-Origin", "*")
        self.finish()
 
class GetTrackerFields(tornado.web.RequestHandler):
    def get(self):
        col = self.application.db.ctf_fields
        self.set_header("Access-Control-Allow-Origin", "*")
        resp = { 'fields': [] }
        for row in col.find():
            resp['fields'].append({ 'name': row['name'], 'desc': row['desc'] })
        print resp
        self.write(resp)
        self.finish()

class GetFlowFields(tornado.web.RequestHandler):
    def get(self):
        col = self.application.db.flow_fields
        self.set_header("Access-Control-Allow-Origin", "*")
        resp = { 'fields': [] }
        for row in col.find():
            resp['fields'].append({ 'name': row['name'], 'desc': row['desc'] })
        print resp
        self.write(resp)
        self.finish()
        
class Application(tornado.web.Application):
    def __init__(self):
        
        conn = pymongo.Connection()
        self.db = conn['hpoo']
        
        handlers = [
            (r'/getTrackerFields', GetTrackerFields),
            (r'/getFlowFields',GetFlowFields),
            (r'/setConnections', SetConnections),
            (r'/getConnections', GetConnections)
        ]
        
        
        tornado.web.Application.__init__(self, handlers)
    
    

if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = Application()
    server = tornado.httpserver.HTTPServer(app)
    server.listen(8123)

    tornado.ioloop.IOLoop.instance().start()
